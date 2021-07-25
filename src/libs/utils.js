export const fiveDaysWeatherMapper = (data) => {
  if(!data)
    return

  let mappedData = {};
  let currentDate = null;
  data.list.forEach((d,index) => {
    if(!mappedData[d.dt_txt.split(" ")[0]])
      mappedData[d.dt_txt.split(" ")[0]] = []
    mappedData[d.dt_txt.split(" ")[0]].push(d)
    currentDate = d.dt_txt.split(" ")[0]
  })
  if(Object.keys(mappedData).length > 5){
    delete mappedData[Object.keys(mappedData)[Object.keys(mappedData).length - 1]]
  }
  return mappedData;
}

export const getFiveDaysWeatherMapper = () =>{
  return JSON.parse(localStorage.getItem('fiveDaysWeatherSelected'))
}

export const getMaxMinTemp = (list) => {
  let maxMin = {max: 0, min: 1000};
  list.forEach((l) => {
    if(maxMin.max < l.main.temp_max){
      maxMin.max = l.main.temp_max
    }
    if(maxMin.min > l.main.temp_min){
      maxMin.min = l.main.temp_min
    }
  })
  return maxMin
}
