---
name: tough problem
created: 2022-11-20T17:46:24-06:00
updated: 2022-11-20T17:46:36-06:00
aliases: 
tags: 
---
# Tough Problem

## Question

What is a situation where you had to solve a tough engineering problem? (What was the problem? What did you do to solve it? What was the outcome?)

## Start

My team was tasked with modernizing a legacy process used to parse and format transaction log data and display it in a web view for legal and tax related research teams.
- The data was PCI in nature, but could be cleaned for use outside the PCI environment.
- The existing application only existed in the PCI environment which required additional access credentials for viewing the web application
- Our security team flagged the process for vulnerability risks and requested security patches to the existing codebase.
- The end result was 
  
## Solution
  I devised a solution that would allow us to develop one solution that could be deployed to both our secure PCI and standard user networks simultaneously.

- The existing parser's code was not maintainable, I rewrote the parser in NodeJS
- I started with scrubbed data files for a development data source.
- Performance of the NodeJS process was slow in comparison to the original parser, so I ported underperforming portions of the codebase into native C++ code modules for the NodeJs process to utilize.
- I lead my team in the redesign and implementation of a frontend solution that would allow researchers to research transactions across multiple days and multiple business units, queue transactions of interest, view transaction signatures, and print a list of transactions from their queue.
- After the standard environment solution was ready we adapted the process to work within the secure PCI environment.  This was a significant effort due to limitations of our existing server infrastructure.
- I requested newer Redhat Linux servers for that environment and was able to deploy and iterate on the application after the new PCI server environment was set up.
- Had to partner with an internal data encryption team to set up a description mechanism for some of the PCI related data.
  
  ## Outcome
  - Enabled transaction level research across the entire organization.
  - Greatly reduced time required to research transactions through a print queue and optimized searching.
  - Presented the solution to several teams thorough the organization which gave my area significant political capital to innovate in other areas.
