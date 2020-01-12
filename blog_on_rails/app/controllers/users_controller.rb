class UsersController < ApplicationController
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
        @user = User.find params[:id]
    end

    def update
        if @user.update user_params
            flash[:notice] = 'User information updated successfully'
            redirect_to root_path
        else
            render :edit
        end
    end

    def edit_password
        @user = User.find params[:id]
        render :edit_password
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
    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
