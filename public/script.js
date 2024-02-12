console.log('Modal Medley app is ready!');

const transports = {
    "Walking": { speed: 3.1, range: 25 },
    "Boosted Mini S Board": { speed: 18, range: 7 },
    "Evolve Bamboo GTR 2in1": { speed: 24, range: 31 },
    "OneWheel XR": { speed: 19, range: 18 },
    "Swagtron Swagger 5 Elite": { speed: 18, range: 12 },
    "Segway Ninebot S": { speed: 10, range: 13 },
    "Segway Ninebot S-PLUS": { speed: 12, range: 22 },
    "Razor Scooter": { speed: 18, range: 15 },
    "GeoBlade 500": { speed: 15, range: 8 },
    "Unagi E500": { speed: 16, range: 15 }
  };

document.querySelectorAll('.transport-btn').forEach(button => {
    button.addEventListener('click', function() {

      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
      } 
      else {
        document.querySelectorAll('.transport-btn.selected').forEach(selectedButton => {
          selectedButton.classList.remove('selected');
        });
        this.classList.add('selected');
      }
    });
  });


  
document.getElementById('calculate').addEventListener('click', function() {
const selectedTransport = document.querySelector('.transport-btn.selected')?.dataset.transport;
const distance = parseFloat(document.getElementById('distance').value);
if (!selectedTransport) {
    alert('Please select a transport mode.');
    return;
}
if (isNaN(distance) || distance <= 0) {
    alert('Please enter a valid distance.');
    return;
}

const transportData = transports[selectedTransport];
if (distance > transportData.range) {
    document.getElementById('result').textContent = `Distance out of range for ${selectedTransport}. Max range is ${transportData.range} miles.`;
    return;
}

const time = distance / transportData.speed;
document.getElementById('result').textContent = `Traveling ${distance} miles by ${selectedTransport} will take approximately ${time.toFixed(2)} hours.`;
});

  
document.getElementById('compare').addEventListener('click', function() {
    const selectedTransport = document.querySelector('.transport-btn.selected')?.dataset.transport;
    const compareWith = document.getElementById('compare-with').value;
    const distance = parseFloat(document.getElementById('distance').value);
  
    if (!selectedTransport) {
      alert('Please select a primary transport mode.');
      return;
    }
  
    if (isNaN(distance) || distance <= 0) {
      alert('Please enter a valid distance.');
      return;
    }
  
    let comparisonHtml = `<h3>Comparison Results:</h3>`;
  
    if (compareWith === "all") {
      for (const [key, value] of Object.entries(transports)) {
        const time = distance / value.speed;
        if (distance <= value.range) {
          comparisonHtml += `<p>${key}: ${time.toFixed(2)} hours</p>`;
        } else {
          comparisonHtml += `<p>${key}: Distance out of range</p>`;
        }
      }
      comparisonHtml += '</p>';
    } else if (compareWith && compareWith !== selectedTransport) {
      const primaryTime = distance / transports[selectedTransport].speed;
      const compareTime = distance / transports[compareWith].speed;
      comparisonHtml += `<p>${selectedTransport}: ${primaryTime.toFixed(2)} hours</p>`;
      comparisonHtml += `<p>${compareWith}: ${compareTime.toFixed(2)} hours</p>`;
    } else {
      alert('Please select a different mode to compare or choose "All Modes".');
      return;
    }
  
    document.getElementById('comparison-result').innerHTML = comparisonHtml;
  });
  

  document.getElementById('calculate-distance').addEventListener('click', function() {
    const timeAvailable = parseFloat(document.getElementById('time-available').value);
    
    if (isNaN(timeAvailable) || timeAvailable <= 0) {
      alert('Please enter a valid time.');
      return;
    }
  
    let distanceHtml = `<h3>Possible Distances:</h3>`;
    
    Object.entries(transports).forEach(([key, value]) => {
      const distance = (timeAvailable / 60) * value.speed;
      if (distance <= value.range) {
        distanceHtml += `<p>${key}: ${distance.toFixed(2)} miles</p>`;
      } else {
        distanceHtml += `<p>${key}: Max ${value.range} miles (Out of range)</p>`;
      }
    });
    document.getElementById('distance-result').innerHTML = distanceHtml;
  });
  