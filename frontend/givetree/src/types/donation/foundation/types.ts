export interface FoundationDonation {
  regularDonations: RegularDonations[];
  oneTimeDonations: OneTimeDonations[];
}

export interface RegularDonations {
  foundationName: string;
  foundationImage: string;
  monthlyDonationAmount: number;
  paymentDate: number;
}

export interface OneTimeDonations {
  foundationName: string;
  foundationImage: string;
  oneTimeDonationAmount: number;
  donationDate: string;
}

export interface FoundationRegularDonation {
  foundationId: number;
  image: string;
  foundationName: string;
  amount: number;
}

export interface FoundationOneTimeDonation {
  foundationId: number;
  foundationImage: string;
  foundationName: string;
  donationType: string;
  amount: number;
  message: string | null;
  createdAt: string;
}
