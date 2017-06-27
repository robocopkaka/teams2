Rails.application.routes.draw do
  get 'teams/new'

  get 'teams/index'

  get 'teams/edit'

  resources :teams

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
