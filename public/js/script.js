// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
  

  /******************************************** */

    function setcategory(filter) {
        document.getElementById('category').value = filter;
        document.getElementById('filterForm').submit();
        
          
    }
  /***************************************/  
   
    document.addEventListener('DOMContentLoaded', function() {
        // Select all buttons that represent category icons
        let buttons = document.querySelectorAll('.butt');
        let paragraphs = document.querySelectorAll('.filter_name'); 
        
        // Function to apply color to the icons based on saved category in local storage
        function applyIconColor() {
            // Retrieve the selected category from local storage
            let selectedCategory = localStorage.getItem('selectedCategory');
    
            // Iterate over all buttons
            buttons.forEach(function(button) {
                // Get the icon element within the button
               let icon = button.querySelector('.icn');
               
            let paragraph = button.nextElementSibling;

            // Check if the button's category matches the selected category
            if (button.getAttribute('data-category') === selectedCategory) {
                // Apply underline style to the paragraph
                icon.style.opacity = '1';
                paragraph.style.textDecoration = 'underline';
                paragraph.style.textDecorationColor = 'black';
                paragraph.style.textDecorationThickness = '0.20rem';
                paragraph.style.textUnderlineOffset = '0.5rem';
                button.classList.add('active');
                
               
            } else {
                // Reset the underline style of the paragraph
                paragraph.style.textDecoration = 'none';
                icon.style.opacity = '0.75';
                button.classList.remove('active');
               
            }
        });

 
        }
    
        // Add event listener to each button
        buttons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                // Prevent the form from submitting (if necessary)
                event.preventDefault();
    
                // Get the category from the button's data-category attribute
                let category = button.getAttribute('data-category');
    
                // Save the selected category in local storage
                localStorage.setItem('selectedCategory', category);
    
                // Apply color to the icons based on the selected category
                applyIconColor();
            });
        });
    
        // Apply icon colors based on saved category in local storage when the page loads
        applyIconColor();
    


        paragraphs.forEach(function(paragraph) {
            paragraph.addEventListener('click', function(event) {
                // Find the button related to this filter name
                let button = event.target.previousElementSibling;
        
                // Trigger the button click
                button.click();
            });
        });


        
        // Check if the current page is the homepage
        if (window.location.pathname === '/listings') {
            // Clear local storage to reset all icon colors
            localStorage.removeItem('selectedCategory');
            // Reset all icon colors
            applyIconColor();
        }
    });
    
/************************8 */

  let taxSwitch = document.getElementById("flexSwitchCheckDefault");

  taxSwitch.addEventListener("click",()=>{
 let taxInfo = document.getElementsByClassName("tax-info");
      
    for(info of taxInfo){
      if(info.style.display != 'inline'){
      info.style.display = 'inline';
     }
     else{
      info.style.display="none";
     }
    }
     
  })