## Frontend (React/Next.js or Streamlit)

User uploads satellite image or selects from sample dataset.

Sends request to API Gateway.

## API Gateway → Lambda (Agent Logic)

Lambda fetches image from S3.

Sends metadata + image description to Amazon Bedrock.

Bedrock analyzes anomalies & writes an archaeology-style report.

Lambda stores result in DynamoDB (memory of findings).

Final report stored back in S3.

## Bedrock (Reasoning Layer)

LLM reasoning: “Rectangular soil anomaly detected at (X,Y), likely man-made.”

Produces structured JSON (location, anomaly type, confidence).

Produces human-readable text for archaeologists.

## DynamoDB (Memory)

Keeps track of locations already scanned.

Enables “comparative reasoning” → If new image overlaps with old, Bedrock compares results.

## Visualization (QuickSight or Maps API)

Heatmaps of possible sites.

Markers on Google Maps / Leaflet.js map in frontend.

## Reports (S3)

Each scan generates a PDF/TXT report.

Can be shared with judges as project output.
