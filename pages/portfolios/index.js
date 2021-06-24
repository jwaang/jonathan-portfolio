import axios from "axios";
import PortfolioCard from "@/components/portfolios/PortfolioCards";
import Link from "next/link";
import { useState } from "react";

const fetchPortfolios = () => {
  const query = `
      query Portfolios {
        portfolios {
          _id
          title
          company
          companyWebsite
          location
          jobTitle
          description
          startDate
          endDate
        }
      }
    `;
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

const graphCreatePortfolio = () => {
  const query = `
      mutation CreatePortfolio {
        createPortfolio(
          input: {
            title: "Job in Dallas"
            company: "Citi"
            companyWebsite: "www.citi.com"
            location: "Dallas, TX"
            jobTitle: "SWE"
            description: "Yeet haw"
            startDate: "01/01/2019"
            endDate: "01/01/2021"
          }
        ) {
          _id
          title
          company
          companyWebsite
          location
          jobTitle
          description
          startDate
          endDate
        }
      }
    `;
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.createPortfolio);
};

const graphUpdatePortfolio = (id) => {
  const query = `
    mutation UpdatePortfolio($id: ID) {
      updatePortfolio(id: $id, input: { title: "Updated Title!" }) {
          _id
          title
          company
          companyWebsite
          location
          jobTitle
          description
          startDate
          endDate
      }
    }
    `;
  const variables = { id };
  return axios
    .post("http://localhost:3000/graphql", { query, variables })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.updatePortfolio);
};

const graphDeletePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio($id: ID) {
      deletePortfolio(id: $id)
    }
    `;
  const variables = { id };
  return axios
    .post("http://localhost:3000/graphql", { query, variables })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.deletePortfolio);
};

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  };

  const updatePortfolio = async (id) => {
    const updatedPortfolio = await graphUpdatePortfolio(id);
    const index = portfolios.findIndex((p) => p._id === id);
    const newPortfolios = [...portfolios];
    newPortfolios[index] = updatedPortfolio;
    setPortfolios(newPortfolios);
  };

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    console.log(deletedId);
    let p = portfolios.filter((p) => p._id !== deletedId);
    setPortfolios(p);
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button onClick={createPortfolio} className="btn btn-primary">
          Create Portfolio
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              <button onClick={() => updatePortfolio(portfolio._id)} className="btn btn-primary">
                Update Portfolio
              </button>
              <button onClick={() => deletePortfolio(portfolio._id)} className="btn btn-primary">
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { data: { portfolios } };
};

export default Portfolios;
