import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { MyHttpService } from './service/my-http.service';

//TODO 
// - refactor the code so that it is not procedural but oop
// - poter avere una visione giornaliere e settimanale anche degli anni precedenti
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  dayChart = new Chart({
    credits: {
      enabled: false
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Hours of day'
    },
    xAxis:{
      categories:["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", 
                  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
    },
    series: [
      {
        name: 'Quality',
        data: [],
        color: "Red"            
      } as any
    ]
  })
  
  weekChart = new Chart({
    credits: {
      enabled: false
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Days of week'
    },
    xAxis:{
      categories:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    series: [
      {
        name: 'Quality',
        data: [],
        color: "Red"
      } as any
    ]
  })

  yearChart = new Chart({
    credits: {
      enabled: false
    },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Months of year'
    },
    xAxis:{
      categories:["Jenuary", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"]
    },  
    series: [
      {
        name: 'Quality',
        data: [],
        color: "Red"
      } as any
    ]
  })

  
  qualitySerie: any
  quantitySerie: any
  completedTasksSerie: any

  //these variables store the values of the last timestamp
  year: any
  weekOfTheYear: any
  dayOfTheYear: any

  //these variables store the state of each chart
  dayOfFirstChart: any
  weekOfSecondChart: any 
  yearOfThirdChart: any
  typeOfDataOfFirstChart: any
  typeOfDataOfSecondChart: any
  typeOfDataOfThirdChart: any

  //these variables allows me to decrease the number of event listeners
  setQuality:any
  setQuantity:any
  setCompletedTasks:any

  //this variable stores the data from the backend
  actualData: any

  constructor(private service: MyHttpService){

    this.qualitySerie = {
      name: "Quality",
      data: [],
      color: "Red",
      type: 'line'
    }
    
    this.quantitySerie = {
      name: "Quantity",
      data: [],
      color: "Blue",
      type: 'line'
    }

    this.completedTasksSerie = {
      name: "Completed tasks",
      data: [],
      color: "Green",
      type: 'line'
    }

    this.performTimestamp()
    
    //when the frontend starts, the data showed is relative to the current date
    this.dayOfFirstChart = this.dayOfTheYear
    this.weekOfSecondChart = this.weekOfTheYear
    this.yearOfThirdChart = this.year

    //when the frontend starts, the data showed is of type quality
    this.typeOfDataOfFirstChart = "quality"
    this.typeOfDataOfSecondChart = "quality"
    this.typeOfDataOfThirdChart = "quality"
    
    this.showFirstChart(this.typeOfDataOfFirstChart, this.year, this.dayOfFirstChart)
    this.showSecondChart(this.typeOfDataOfSecondChart, this.year, this.weekOfSecondChart)
    this.showThirdChart(this.typeOfDataOfThirdChart, this.yearOfThirdChart)

    this.setQuality = "quality"
    this.setQuantity = "quantity"
    this.setCompletedTasks = "completedTasks"

  }

  eventListenerOfFirstChart(typeOfData : string){
    this.showFirstChart(typeOfData, this.year, this.dayOfTheYear)
  }

  eventListenerOfSecondChart(typeOfData : string){
    this.showSecondChart(typeOfData, this.year, this.weekOfTheYear)
  }

  eventListenerOfThirdChart(typeOfData : string){
    this.showThirdChart(typeOfData, this.year)
  }
  
  previousDay(){
    if(this.dayOfFirstChart > 1){
      this.dayOfFirstChart = this.dayOfFirstChart - 1
      this.showFirstChart(this.typeOfDataOfFirstChart, this.year, this.dayOfFirstChart)
    } 
  }

  nextDay(){
    if(this.dayOfFirstChart < 365){
      this.dayOfFirstChart = this.dayOfFirstChart + 1
      this.showFirstChart(this.typeOfDataOfFirstChart, this.year, this.dayOfFirstChart)
    }
  }

  previousWeek(){
    if(this.weekOfSecondChart > 1){
      this.weekOfSecondChart = this.weekOfSecondChart - 1
      this.showSecondChart(this.typeOfDataOfSecondChart, this.year, this.weekOfSecondChart)
    }
  }

  nextWeek(){
    if(this.weekOfSecondChart < 52){
      this.weekOfSecondChart = this.weekOfSecondChart + 1
      this.showSecondChart(this.typeOfDataOfSecondChart, this.year, this.weekOfSecondChart)
    }
  }

  previousYear(){
    this.yearOfThirdChart = this.yearOfThirdChart - 1
    this.showThirdChart(this.typeOfDataOfThirdChart, this.yearOfThirdChart)
  }

  nextYear(){
    this.yearOfThirdChart = this.yearOfThirdChart + 1
    this.showThirdChart(this.typeOfDataOfThirdChart, this.yearOfThirdChart)
  }

  /**
   * This method obtains data of a given type from the backend and shows it in the chart with the daily view
   * 
   * @param typeOfData the given type of data
   * @param year given that the day is relative to the year, in order to identify the day, we first need to specify the year
   * @param dayOfTheYear the day we are interested in
   */
  showFirstChart(typeOfData: string, year: number, dayOfTheYear: number){
    Highcharts.charts[0]?.series[0].remove()

    if(typeOfData === "quality"){     
      Highcharts.charts[0]?.addSeries(this.qualitySerie, true, undefined)
      this.typeOfDataOfFirstChart = "quality"
    } else if (typeOfData === "quantity"){
      Highcharts.charts[0]?.addSeries(this.quantitySerie, true, undefined)
      this.typeOfDataOfFirstChart = "quantity"
    } else if (typeOfData === "completedTasks"){
      Highcharts.charts[0]?.addSeries(this.completedTasksSerie, true, undefined)
      this.typeOfDataOfFirstChart = "completedTasks"
    }

    this.service.get(environment.baseUrl+"/dashboard/dataOfDay/"+typeOfData+"/"+year+"/"+dayOfTheYear).subscribe((dataFromBackend)=>{     
      this.actualData = dataFromBackend
      Highcharts.charts[0]?.series[0].setData(this.actualData)
    })
  }

  /**
   * This method obtains data of a given type from the backend and shows it in the chart with the weekly view
   * 
   * @param typeOfData the given type of data
   * @param year given that the week is relative to the year, in order to identify the week, we first need to specify the year
   * @param weekOfTheYear the week we are interested in
   */
  showSecondChart(typeOfData: string, year: number, weekOfTheYear: number){
    Highcharts.charts[1]?.series[0].remove()

    if(typeOfData === "quality"){     
      Highcharts.charts[1]?.addSeries(this.qualitySerie, true, undefined)
      this.typeOfDataOfSecondChart = "quality"
    } else if (typeOfData === "quantity"){
      Highcharts.charts[1]?.addSeries(this.quantitySerie, true, undefined)
      this.typeOfDataOfSecondChart = "quantity"
    } else if (typeOfData === "completedTasks"){
      Highcharts.charts[1]?.addSeries(this.completedTasksSerie, true, undefined)
      this.typeOfDataOfSecondChart = "completedTasks"
    }

    this.service.get(environment.baseUrl+"/dashboard/dataOfWeek/"+typeOfData+"/"+year+"/"+weekOfTheYear).subscribe((dataFromBackend)=>{     
      this.actualData = dataFromBackend
      Highcharts.charts[1]?.series[0].setData(this.actualData)
    })
  }

  /**
   * This method obtains data of a given type from the backend and shows it in the chart with the annual view  
   * 
   * @param typeOfData the given type of data
   * @param year the year we are interested in
   */
  showThirdChart(typeOfData: string, year: number){
    Highcharts.charts[2]?.series[0].remove()

    if(typeOfData === "quality"){     
      Highcharts.charts[2]?.addSeries(this.qualitySerie, true, undefined)
      this.typeOfDataOfThirdChart = "quality"
    } else if (typeOfData === "quantity"){
      Highcharts.charts[2]?.addSeries(this.quantitySerie, true, undefined)
      this.typeOfDataOfThirdChart = "quantity"
    } else if (typeOfData === "completedTasks"){
      Highcharts.charts[2]?.addSeries(this.completedTasksSerie, true, undefined)
      this.typeOfDataOfThirdChart = "completedTasks"
    }

    this.service.get(environment.baseUrl+"/dashboard/dataOfYear/"+typeOfData+"/"+year).subscribe((dataFromBackend)=>{     
      this.actualData = dataFromBackend
      Highcharts.charts[2]?.series[0].setData(this.actualData)
    })
  }

  /**
   * This method obtains the current date and assigns its values to the properties of the component
   */
  performTimestamp(){
    let timestamp = new Date()
    this.year = timestamp.getFullYear()
    this.computeWeekOfTheYear()
    this.computeDayOfTheYear()
  }
  
  /**
   * This method obtains the number that represents this week in the year
   */
  computeWeekOfTheYear(){
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    this.weekOfTheYear = Math.ceil((((currentDate.getTime() - startDate.getTime()) / 86400000) + startDate.getDay() + 1) / 7);
  }

  /**
   * This method obtains the number that represents this day in the year
   */
  computeDayOfTheYear(){
    let currentDate = new Date()
    let startDate = new Date(currentDate.getFullYear(), 0, 0)
    this.dayOfTheYear = Math.floor((currentDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24)
  }

}