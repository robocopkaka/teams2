/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> and
// <%= stylesheet_pack_tag 'hello_vue' %> to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue/dist/vue.esm'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
  axios.defaults.headers.common['Accept'] = 'application/json'
  var element = document.getElementById("team-form")

  if(element != null){
  	var id = element.dataset.id
  	var team = JSON.parse(element.dataset.team)
  	var players_attributes = JSON.parse(element.dataset.playersAttributes)
  	players_attributes.forEach(player => player._destroy = null)
  	team.players_attributes = players_attributes
  	var app = new Vue({
  		el: element,
  		data(){
  			return {id:id, team: team}
  		},
  		methods:{
  			addPlayer(){
  				this.team.players_attributes.push({
  					id: null,
  					name: "",
  					_destroy: null
  				})
  			},
  			removePlayer(index){
  				var player = this.team.players_attributes[index]
  				if (player.id == null){
  				  this.team.players_attributes.splice(index, 1)
  				 } else {
  				 	this.team.players_attributes[index]._destroy = "1"
  				 }
  			},
  			saveTeam(){
  				if (this.id == null){
	  				axios.post('/teams', {team: this.team}).then(response =>{
	  					window.location = `/teams/${response.data.id}`
	  				}, response=>{
	  					console.log(response);
	  				})
	  			}
	  			else{
	  				axios.put(`/teams/${this.id}`, {team: this.team}).then(response =>{
	  					window.location = `/teams/${response.data.id}`
	  				}, response=>{
	  					console.log(response);
	  				})
	  			}
  			},
  			undoRemove(index){
  				this.team.players_attributes[index]._destroy = null
  			}
  		}
  	})
  }
})
