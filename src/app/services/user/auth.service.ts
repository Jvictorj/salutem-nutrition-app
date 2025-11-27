import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, FacebookAuthProvider, User } from 'firebase/auth';
import { BehaviorSubject, Observable, map } from 'rxjs';

// Interface para tipar os dados do usuário no Firestore
export interface UserData {
  uid?: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  weight?: number;
  height?: number;
  photoUrl?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // Observable que contém o objeto do usuário atual (ou null se deslogado)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Observable booleano simples para Route Guards (true/false)
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore
  ) {
    // Inicializa o monitoramento do estado
    this.afAuth.authState.subscribe((user) => {
      // CORREÇÃO 1: Convertendo o tipo Compat para o tipo Modular
      this.currentUserSubject.next(user as unknown as User);
    });

    // Cria um observable derivado apenas para saber se está logado
    this.isAuthenticated$ = this.currentUserSubject.pipe(
      map(user => !!user)
    );
  }

  // --- Métodos de Acesso ---

  async getCurrentUser(): Promise<User | null> {
    const user = await this.afAuth.currentUser;
    // CORREÇÃO 2: Convertendo o retorno
    return user as unknown as User;
  }

  // --- Autenticação ---

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      throw new Error(this.translateFirebaseError(error.code));
    }
  }

  async register(data: UserData, password: string): Promise<void> {
    try {
      // 1. Criar o usuário no Auth
      const credential = await this.afAuth.createUserWithEmailAndPassword(data.email, password);
      
      if (credential.user) {
        // 2. Atualizar o perfil básico do Auth (Nome e Foto)
        await credential.user.updateProfile({
          displayName: data.fullName,
          photoURL: data.photoUrl || null
        });

        // 3. Salvar os dados completos no Firestore
        const userToSave: UserData = {
          ...data,
          uid: credential.user.uid,
          createdAt: new Date()
        };

        await this.saveUserToFirestore(userToSave);
      }
    } catch (error: any) {
      throw new Error(this.translateFirebaseError(error.code));
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error: any) {
      throw new Error(this.translateFirebaseError(error.code));
    }
  }

  // --- Social Login (Google / Facebook) ---

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      if (credential.user) {
        // CORREÇÃO 3: Convertendo o tipo ao passar para a função
        await this.checkAndSaveSocialUser(credential.user as unknown as User);
      }
    } catch (error: any) {
      throw new Error(this.translateFirebaseError(error.code));
    }
  }

  async loginWithFacebook(): Promise<void> {
    try {
      const provider = new FacebookAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      if (credential.user) {
        // CORREÇÃO 4: Convertendo o tipo ao passar para a função
        await this.checkAndSaveSocialUser(credential.user as unknown as User);
      }
    } catch (error: any) {
      throw new Error(this.translateFirebaseError(error.code));
    }
  }

  // --- Helpers Privados ---

  // Salva ou atualiza dados no Firestore
  private async saveUserToFirestore(user: UserData): Promise<void> {
    if (!user.uid) return;
    // O { merge: true } garante que não apagamos dados existentes se apenas atualizarmos um campo
    await this.firestore.collection('users').doc(user.uid).set(user, { merge: true });
  }

  // Verifica se o usuário social já existe no banco, se não, cria
  private async checkAndSaveSocialUser(user: User) {
    const userRef = this.firestore.collection('users').doc(user.uid);
    const doc = await userRef.get().toPromise();

    if (!doc?.exists) {
      const newUser: UserData = {
        uid: user.uid,
        email: user.email || '',
        fullName: user.displayName || 'Usuário',
        photoUrl: user.photoURL || '',
        createdAt: new Date()
      };
      await userRef.set(newUser);
    }
  }

  // Tradutor de Erros do Firebase para Português
  private translateFirebaseError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está sendo usado por outra conta.';
      case 'auth/invalid-email':
        return 'O e-mail informado é inválido.';
      case 'auth/user-not-found':
        return 'Usuário não encontrado.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde.';
      case 'auth/popup-closed-by-user':
        return 'O login foi cancelado.';
      default:
        return 'Ocorreu um erro desconhecido. Tente novamente.';
    }
  }
}