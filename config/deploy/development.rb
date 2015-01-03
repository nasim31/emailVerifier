server "192.241.143.99", :app, :web, :db, :primary => true
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
  run "ln -s #{shared_path}/system/tmp #{release_path}"

  run "rm -rf #{release_path}/public/system"
  run "ln -s #{shared_path}/system/ #{release_path}/public/" 

  run "rm -rf #{release_path}/public/uploads"
  run "ln -s #{shared_path}/uploads  #{release_path}/public/"

  # run "rm -rf #{release_path}/public/s3"
  # run "ln -s #{shared_path}/uploads/s3  #{release_path}/public/"

  # run "mv #{release_path}/config/database.example.yml  #{release_path}/config/database.yml"

  run "cd #{release_path} && bundle install"
  # run "cd #{release_path} && rake db:drop"
  # run "cd #{release_path} && rake db:create"
  # run "cd #{release_path} && rake db:migrate"
  # run "cd #{release_path} && rake db:seed"
  # run "cd #{release_path} && rake assets:precompile"
  # run "chown -R www-data:www-data #{release_path}/*"
  # run "chmod -R 777 #{release_path}/log"
end

namespace :deploy do
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end