class CommentsController < ApplicationController

    def create
        @comment = Comment.new comment_params
        @comment.post_id = params[:post_id]

        if @comment.save
            flash[:notice] = 'Comment added successfully'
            redirect_to post_path(@comment.post_id)
        end
    end

    def destroy
        @comment = Comment.find params[:id]
        @comment.destroy
        redirect_to post_path(@comment.post_id)
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :post_id)
    end

end