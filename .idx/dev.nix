
{ pkgs }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_20
    npm
    mongodb # Assuming MongoDB is needed locally for development, otherwise remove
  ];

  shellHook = ''
    echo "Welcome to the MREN AI Task Orchestrator development environment!"
    echo "To start the server, navigate to the 'server' directory and run 'npm start'."
    echo "To start the client, navigate to the 'client' directory and run 'npm start'."
  '';
}
