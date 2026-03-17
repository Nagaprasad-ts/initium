<div style="display:flex; flex-direction:column; gap:8px;">
    
    <label style="font-weight:600;">
        Image (Events Page)
    </label>

    <input 
        type="file" 
        name="banner_image_events_page"
        accept="image/*"
        style="padding:8px; border:1px solid #ccc; border-radius:6px;"
    >

    @if (isset($record) && $record?->banner_image_events_page)
        <div style="margin-top:10px;">
            <p style="font-size:12px; color:gray;">Current Image:</p>
            
            <img 
                src="{{ asset('storage/' . $record->banner_image_events_page) }}" 
                style="max-width:200px; border-radius:8px;"
            >
        </div>
    @endif

</div>