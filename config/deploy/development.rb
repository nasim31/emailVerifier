server "128.199.252.118", :app, :web, :db, :primary => true
# server "128.199.213.226", :app, :web, :db, :primary => true
set :deploy_to, "/var/www/verifier/"
set :branch, 'master'
set :scm_verbose, true
set :use_sudo, false
set :rails_env, "development" #added for delayed job 
set :rvm_type, :system


after 'deploy:update_code' do
  # run "cd #{release_path}; RAILS_ENV=production rake assets:precompile"
  run "cd #{release_path};"
  
  run "rm -rf #{release_path}/tmp"
  run "ln -s #{shared_path}/tmp #{release_path}"

  run "rm -rf #{release_path}/public/system"
  run "ln -s #{shared_path}/system/ #{release_path}/public/" 

  run "rm -rf #{release_path}/public/uploads"
  run "ln -s #{shared_path}/uploads  #{release_path}/public/"

  run "cd #{release_path} && bundle install"
end

namespace :deploy do
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end