class PostsController < ApplicationController

    before_action :find_post, only: [:edit,:update,:show, :destroy]

    def new
        @post = Post.new
    end

    def create
        @post = Post.new post_params
        if @post.save # perform validation and save if successful
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
        @posts = Post.all
    end

    def show
        @comments = Comment.all
        @comment = Comment.new(post_id: params[:post_id])
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