EXIT_CODE=0
PORT=3334

function free_port_3334() {
  echo "[run-local-e2e] : killing processes on port 3334"
  lsof -ti :$PORT | xargs kill -9
}

free_port_3334

echo "[run-local-e2e] : starting the dev server"
npm start -- --port=$PORT &

sleep 5;

echo "[run-local-e2e] : running e2e tests"
npm run test:e2e -- --env WEB_APP_URI="http://localhost:$PORT" || EXIT_CODE=$?

free_port_3334

exit $EXIT_CODE
