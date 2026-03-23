interface Category {
    id: number;
    name: string;
}

interface Event {
    id: number;
    name: string;
    slug: string;
    description: string;
    category_id: number;
    category: Category;
    type: 'individual' | 'group' | 'duo';
    venue: string;
    event_start_date: string;
    price: string;
    first_price: string;
    banner_image_events_page: string | null;
    whatsapp_link: string | null;  // ← add this
}
interface HomeProps {
    events: Event[];
    categories: Category[];
}

export default function WhatsApp({ events }: HomeProps) {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            {events.map(event => (
                <div key={event.id} className='flex flex-row gap-2 mb-4'>
                    <p>{event.name}</p> -
                    {event.whatsapp_link && (
                        <a href={event.whatsapp_link} target="_blank" rel="noreferrer">
                            Link of {event.name}
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}