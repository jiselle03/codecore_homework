class CommentsController < ApplicationController

    before_action :authenticate_user!

    def create
        @post = Post.find params[:post_id]
        @comment = Comment.new comment_params
        @comment.post_id = params[:post_id]
        @comment.user = current_user

        if @comment.save
            flash[:notice] = 'Comment added successfully'
            redirect_to post_path(@comment.post_id)
        else
            @comments = @post.comments.order(created_at: :desc)
            render 'posts/show'
        end
    end

    def destroy
        @comment = Comment.find params[:id]
        @comment.destroy
        redirect_to post_path(@comment.post_id)
    end

    private

    def comment_params
        params.require(:comment).permit(:body)
    end

end