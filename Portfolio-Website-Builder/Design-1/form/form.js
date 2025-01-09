
// ----------------------------------------------------------------------------
//                                Get Data from UI
// ----------------------------------------------------------------------------

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const descriptionAbout = document.getElementById('description-about').value;
    const facebook = document.getElementById('facebook').value;
    const linkedin = document.getElementById('linkedin').value;
    const twitter = document.getElementById('twitter').value;
    const picture = document.getElementById('picture').files[0];
    const pdf = document.getElementById('pdf').files[0];



    // ----------------------------------------------------------------------------
    //                             Data Store in Local Storage
    // ----------------------------------------------------------------------------


    const reader1 = new FileReader();
    reader1.onload = function(e) {
      const pictureData = e.target.result;
      const reader2 = new FileReader();
      reader2.onload = function(e) {
        const pdfData = e.target.result;

        const userData = { name, title, description, facebook, linkedin, twitter, descriptionAbout, picture: pictureData, pdf: pdfData };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Data saved successfully!');

    
        // ----------------------------------------------------------------------------
        //       Enable the Generate Portfolio button after successful submission
        // ----------------------------------------------------------------------------

        document.getElementById('generatePortfolio').disabled = false;
      };
      reader2.readAsDataURL(pdf);
    };
    reader1.readAsDataURL(picture);
  });

  document.getElementById('generatePortfolio').addEventListener('click', function() {
    if (document.getElementById('generatePortfolio').disabled) {
      alert('Please complete the form and submit it before generating the portfolio.');
    } else {
      window.location.href = '/Portfolio-Website-Builder/Design-1/generate/generate.html';
    }
  });