class CommentsController < ApplicationController

    before_action :authenticate_user!
    before_action :find_comment, only: [:destroy]
    before_action :authorize!, only: [:destroy]

    def create
        @post = Post.find params[:post_id]
        @comment = Comment.new comment_params
        @comment.post_id = params[:post_id]
        @comment.user = current_user

        if can? :create, @comment
            if @comment.save
                flash[:notice] = 'Comment added successfully'
                redirect_to post_path(@comment.post_id)
            else
                @comments = @post.comments.order(created_at: :desc)
                render 'posts/show'
            end
        end
    end

    def destroy
        @comment.destroy
        redirect_to post_path(@comment.post_id)
    end

    private

    def comment_params
        params.require(:comment).permit(:body)
    end

    def find_comment
        @comment = Comment.find params[:id]
    end

    def authorize!
        unless can?(:crud, @comment)
            redirect_to post_path(@comment.post_id), alert: 'Not Authorized'
        end
    end

end