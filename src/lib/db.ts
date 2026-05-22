

export class DatabaseService {
  private static instance: DatabaseService;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) return;
    
    try {

      console.log("Database connection prepared.");
      this.isConnected = true;
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) return;
    

    this.isConnected = false;
  }
}

export const db = DatabaseService.getInstance();
