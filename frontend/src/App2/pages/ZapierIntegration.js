
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ZapierIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  

  const handleTrigger = async (e) => {
    e.preventDefault();

    if (!webhookUrl) {
      toast.error("Please enter your Zapier webhook URL");
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          app: "Intellicon",
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          event: "webhook_triggered",
          data: {
            source: "Intellicon Application",
            message: "This is a test webhook from Intellicon"
          }
        }),
      });

      // Since we're using no-cors, we won't get a proper response status
      toast.success("The request was sent to Zapier. Please check your Zap's history to confirm it was triggered.");
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast.error("Failed to trigger the Zapier webhook. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Intellicon + Zapier Integration</h1>
      <Row 
      className="justify-content-md-center"
      >
        <Col  md={2} className='mb-4'>
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Zapier Webhook Integration</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-4">Connect Intellicon to thousands of apps via Zapier webhooks</p>
              <Form onSubmit={handleTrigger}>
                <Form.Group className="mb-3">
                  <Form.Label>Zapier Webhook URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Enter the webhook URL from your Zapier Catch Hook trigger
                  </Form.Text>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-100"
                >
                  {isLoading ? 'Sending...' : 'Trigger Webhook'}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <h6>How to set up:</h6>
              <ol className="ps-3 mb-0">
                <li>Create a new Zap in Zapier</li>
                <li>Choose "Webhooks by Zapier" as the trigger app</li>
                <li>Select "Catch Hook" as the trigger event</li>
                <li>Copy the webhook URL provided by Zapier</li>
                <li>Paste it above and click "Trigger Webhook" to test</li>
              </ol>
            </Card.Footer>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">What You Can Do With Zapier</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-3">Automate your workflows between Intellicon and other applications</p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                      <i className="bi bi-journal-text text-primary"></i>
                    </div>
                    <div>
                      <h6>Send data to your CRM</h6>
                      <p className="text-muted small">Automatically create contacts, leads or deals in your CRM system</p>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                      <i className="bi bi-bell text-primary"></i>
                    </div>
                    <div>
                      <h6>Get notifications</h6>
                      <p className="text-muted small">Send notifications to Slack, email or other platforms</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                      <i className="bi bi-file-earmark-text text-primary"></i>
                    </div>
                    <div>
                      <h6>Generate documents</h6>
                      <p className="text-muted small">Create PDFs, spreadsheets or other documents automatically</p>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default ZapierIntegration;
