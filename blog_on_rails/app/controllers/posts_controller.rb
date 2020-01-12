class PostsController < ApplicationController

    before_action :find_post, only: [:edit,:update,:show, :destroy]

    def new
        @post = Post.new
        @post.user = current_user
        redirect_to new_session_path if !current_user
    end

    def create
        @post = Post.new post_params
        @post.user = current_user
        if @post.save
            flash[:notice] = 'Post added successfully'
            redirect_to post_path(@post.id)
        else
            render :new
        end
    end

    def edit
        
    end

    def update
        if @post.update post_params
            flash[:notice] = 'Post updated successfully'
            redirect_to post_path(@post.id)
        else
            render :edit
        end
    end

    def index
        @posts = Post.order(created_at: :desc)
    end

    def show
        @comment = Comment.new
        @comments = @post.comments.order(created_at: :desc)
    end

    def destroy
        @post.destroy
        redirect_to posts_path
    end


    private

    def find_post
        @post = Post.find params[:id]
    end
    
    def post_params
        params.require(:post).permit(:title, :body)
    end

end