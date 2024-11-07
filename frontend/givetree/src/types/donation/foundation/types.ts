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
