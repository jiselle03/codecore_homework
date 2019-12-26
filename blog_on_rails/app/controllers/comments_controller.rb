class CommentsController < ApplicationController

    def create
        @comment = Comment.new comment_params

        if @comment.save
            flash[:notice] = 'Comment added successfully'
            redirect_to post_path(:post_id)
        else
            redirect_to post_path(:post_id)
        end
    end

    def destroy
        @comment = Comment.find params[:id]
        @comment.destroy
        redirect_to post_path(:post_id)
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :post_id)
    end
    
end