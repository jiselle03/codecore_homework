class UsersController < ApplicationController

    before_action :find_user, except: [:new, :create]
    before_action :authenticate_user!, except: [:index, :show]
    before_action :authorize!, only: [:edit, :update, :destroy]

    def new
        @user = User.new
    end

    def create
        @user = User.new user_params
        if @user.save
            session[:user_id] = @user.id
            redirect_to root_path
        else
            render :new
        end
    end

    def edit
    end

    def update
        if @user.update user_params
            flash[:notice] = 'User information updated successfully'
            redirect_to edit_user_path
        else
            render :edit
        end
    end

    def edit_password
        
    end

    def update_password
        if @user.update user_params
            flash[:notice] = 'User information updated successfully'
            redirect_to root_path
        else
            render :edit_password
        end
    end

    private

    def find_user
        @user = User.find params[:id]
    end

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

    def authorize!
        unless can?(:crud, @user)
            redirect_to root_path, alert: 'Not Authorized'
        end
    end

end
