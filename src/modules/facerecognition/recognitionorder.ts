export interface RecognitionOrder {
    PhotosSource: string;
    DestinationFolder: string;
    RecognitionName: string;
    PhoneNumber: string;
    EmailAddress: string;    
    PatternFaces: Array<string>;
}