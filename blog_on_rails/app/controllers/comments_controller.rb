class CommentsController < ApplicationController

    def create
        @comment = Comment.new comment_params
        if @comment.save
            flash[:notice] = 'Comment added successfully'
            @post = Post.find params[:id]
            redirect_to post_path(@post.id)
        else
            render :new
        end
    end

    def destroy
        @comment = Comment.find params[:id]
        @comment.destroy
        @post = Post.find params[:id]
        redirect_to post_path(@post.id)
    end
    
end
