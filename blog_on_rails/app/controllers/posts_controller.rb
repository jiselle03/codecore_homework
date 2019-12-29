class PostsController < ApplicationController

    before_action :find_post, only: [:edit,:update,:show, :destroy]

    def new
        @post = Post.new
    end

    def create
        @post = Post.new post_params
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
        @posts = Post.all
    end

    def show
        @comment = Comment.new
        @comment.post_id = @post.id
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