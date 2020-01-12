Rails.application.routes.draw do

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get('/', { to: 'welcome#index', as: 'root' })
  get('/user/:id/password/edit', { to: 'users#edit_password', as: 'edit_password' })
  
  resources :posts do
    resources :comments, shallow: true, only: [:create, :destroy]
  end

  resources :users, only: [:new, :create, :edit, :update]
  resource :session, only: [:new, :create, :destroy]

end