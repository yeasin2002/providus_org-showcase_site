# Card Structure – Missions Page

Showcase Card Structure – Missions Page  
Each card represents one approved church mission and presents the most important details
beautifully and simply.  
The design follows the Figma layout (different card sizes, grid arrangement), but the content and
data come from Supabase.

1. Visible (collapsed) state  
   Element Description  
   Main Photo A large image uploaded by the church.  
   Church Name Name of the church or ministry.  
   Country / Region Country of the church (optional small text).  
   Short Mission Text (Preview) First 200 –250 characters of the mission story.  
   “Read more” Button Expands the card on the same page.

2. Expanded State (“Read More” clicked)  
   When expanded, the same card extends downward — no new page loads.  
   Element Description  
   Full Mission Story Complete project or mission text.  
   Photos (if uploaded more than one) Display a carousel for additional images.  
   Optional Video Embed Embedded video (YouTube/Vimeo link or uploaded file).  
   Contact Link / Website Button or link to contact the church directly.  
   Close Button Collapses the expanded view.

At the upload page :
• Clearly indicate:  
• “Upload 1 main photo (required)”  
• “You may upload extra photos (optional)” — these will appear in a small gallery
when your card is expanded.

3. Behavior and Logic  
   • Only status = approved projects are displayed.  
   • Expanding one card collapses others (only one open at a time).  
   • Smooth expand/collapse animation.  
   • Lazy loading for images and videos for better page speed.  
   • Layout adjusts dynamically for different card sizes (as shown in Figma).
