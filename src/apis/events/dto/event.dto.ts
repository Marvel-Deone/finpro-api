export class CreateEventDto {
  title: string;
  description: string;
  event_datetime: string;
  location_type: string;
  address?: string;
  google_meet_link?: string;
  subsidiaryCategoryId: string;
}