export interface CryptoData {
    name: string;
    symbol: string;
    rate: number;
    index: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface NewDataPayload {
    data: CryptoData[];
    symbol: string;
    count: number;
  }
  