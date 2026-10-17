# Route 53 → Vercel website cutover

This changes website routing while keeping `kejiashi.info` registered as it is and Route 53 authoritative for DNS. Do not transfer the domain or change nameservers for this workflow. No DNS changes have been made.

## Prepare

1. Export or record the existing Route 53 hosted zone, especially apex and `www` A/AAAA/CNAME/alias values, routing policies, and TTLs. Retain the existing AWS website and its certificate for rollback.
2. Verify the new Vercel production deployment using its Vercel-provided URL. Replace pending production assets and review all routes.
3. In the Vercel project's domain settings, add `kejiashi.info` and optionally `www.kejiashi.info`. Set the apex as the canonical domain and configure `www` to redirect to it.
4. Obtain the exact project-specific DNS records shown by Vercel. Do not copy a remembered generic IP or CNAME. Add any ownership-verification TXT record requested by Vercel.
5. Lower applicable web-record TTLs (for example to 300 seconds) and wait for the previous TTL to expire before cutover. Route 53 aliases may have provider-controlled TTLs; record those as part of the plan.

## Cut over

1. During an approved window, replace only the web-related records for the apex and `www` with the values Vercel provides. For the apex, use the record type Vercel specifies; do not create an apex CNAME. Remove conflicting/stale web A, AAAA, alias, or CNAME records only as required by the selected configuration.
2. Preserve MX, SPF, DKIM, DMARC, unrelated TXT records, and other service subdomains. Preserve hosted-zone NS/SOA records. Review existing CAA restrictions if certificate issuance fails.
3. Wait for Vercel to show a valid domain and HTTPS certificate. Check DNS answers from multiple resolvers, TLS, homepage, all navigation destinations, sitemap, robots, and canonical redirect behavior. Check both IPv4 and IPv6 if configured.
4. Monitor through the old TTL propagation window. Raise TTLs after the deployment is stable. Keep the AWS origin available until the rollback window closes.

## Roll back

Restore the exact old web-record types, values, routing policies and TTLs from the backup. Remove only conflicting records introduced for the Vercel cutover. Leave mail and other service records intact. Verify resolution and HTTPS against the old AWS site; cached answers can continue pointing to Vercel until their TTL expires. Keep both origins healthy during that period.

For a code-only failure after migration, use Vercel's prior deployment rollback instead of changing DNS, when a known-good Vercel deployment exists.

References: [Vercel custom domains](https://vercel.com/docs/domains/set-up-custom-domain), [domain troubleshooting and TTL guidance](https://vercel.com/docs/domains/troubleshooting).
