class UsersController < ApplicationController
    
    attr_accessor :old_password, :new_password, :new_password_confirmation

    before_action :find_user, only: [:edit, :update, :edit_password, :update_password, :verify_password]
    before_action :authenticate_user!, except: [:index, :show]
    before_action :authorize!, only: [:edit, :update, :destroy]
    before_action :verify_password, only: [:update_password]

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
            flash[:notice] = 'Password updated successfully'
            redirect_to edit_user_path
        else
            render :edit_password
        end
    end

    #getter
    def old_password
        @old_password
    end
    def new_password
        @new_password
    end
    def new_password_confirmation
        @new_password_confirmation
    end
    
    #setter
    def old_password=(value)
        @old_password = value
    end
    def new_password=(value)
        @new_password = value
    end
    def new_password_confirmation=(value)
        @new_password_confirmation = value
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

    def verify_password
        if @old_password != @user.password
            flash[:alert] = 'Please type the correct password.'
            render :edit_password
        elsif @new_password != @new_password_confirmation
            flash[:alert] = 'Passwords do not match.'
            render :edit_password
        else
            @user.password = @new_password 
            @user.password_confirmation = @new_password_confirmation
        end
    end

end
