Rails.application.routes.draw do
  devise_for :users
  resources :homes
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'
  get '*path', to: "home#index", format: :html
end
