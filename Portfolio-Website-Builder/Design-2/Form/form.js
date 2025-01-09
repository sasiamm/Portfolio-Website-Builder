document.getElementById("service-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents form from submitting the traditional way


    // ----------------------------------------------------------------------------
    //                       Collect data from the form
    // ----------------------------------------------------------------------------

    
    const formData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        serviceTagline: document.getElementById("service-tagline").value,

        // Service 1
        service1Heading: document.getElementById("service-1-heading").value,
        service1Description: document.getElementById("service-1-description").value,

        // Service 2
        service2Heading: document.getElementById("service-2-heading").value,
        service2Description: document.getElementById("service-2-description").value,

        // Service 3
        service3Heading: document.getElementById("service-3-heading").value,
        service3Description: document.getElementById("service-3-description").value,

        // Skills
        skills: {
            skill1: document.getElementById("skill-1").value,
            skill2: document.getElementById("skill-2").value,
            skill3: document.getElementById("skill-3").value,
            skill4: document.getElementById("skill-4").value
        },
        skillsTag: document.getElementById("skills-tag").value,
        skillsDescription: document.getElementById("skills-description").value,


        // info

        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,

        picture: document.getElementById("profile-picture").files[0], // Store file for later processing
        cv: document.getElementById("cv").files[0] // Store file for later processing
        
    };

    const picture = formData.picture;
    const cv = formData.cv;


    // ----------------------------------------------------------------------------
    //             Save form data to localStorage, including picture and CV data
    // ----------------------------------------------------------------------------





    if (picture && cv) {
        readFile(picture, (pictureData) => {
            readFile(cv, (pdfData) => {
                // 
                const dataToSave = {
                    ...formData,
                    picture: pictureData, // Store the base64 string of the image
                    cv: pdfData // Store the base64 string of the CV
                };

                localStorage.setItem('formData', JSON.stringify(dataToSave));
                alert('Data saved successfully!');

                // Enable the Generate Portfolio button after successful submission
                const generateButton = document.getElementById('generatePortfolio');
                generateButton.disabled = false;
            });
        });
    } else {
        alert('Please upload both a profile picture and a CV.');
    }
});

// Add a separate event listener for the Generate Portfolio button
document.getElementById('generatePortfolio').addEventListener('click', function () {
    if (this.disabled) {
        alert('Please complete the form and submit it before generating the portfolio.');
    } else {
        window.location.href = '/Portfolio-Website-Builder/Design-2/generate/generate.html';
    }
});

// Utility function to read files as Base64
function readFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}
