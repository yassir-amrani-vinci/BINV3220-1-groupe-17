import { useState } from "react";
import EmptyState from "../components/EmptyState.tsx";
import ErrorState from "../components/ErrorState.tsx";
import LoadingState from "../components/LoadingState.tsx";
import OfferTable from "../components/OfferTable.tsx";
import { useOffers } from "../hooks/useOffers.ts";
import { useApplications } from "../hooks/useApplications.ts";
import type { Offer, PeriodCode } from "../models/offer.ts";
import type { User } from "../models/user.ts";

interface OffersPageProps {
  user: User;
  token: string;
  onUnauthorized: () => void;
}

const DESCRIPTIONS = {
  ADMIN: "Toutes les offres, tous statuts confondus.",
  STUDENT: "Les offres publiées.",
  CONTACT: "Les offres que vous avez déposées.",
} as const;

const PERIOD_OPTIONS: { value: PeriodCode | ""; label: string }[] = [
  { value: "", label: "Toutes les périodes" },
  { value: "P1", label: "P1" },
  { value: "P2", label: "P2" },
  { value: "OTHER", label: "Autre" },
];

const OffersPage = ({ user, token, onUnauthorized }: OffersPageProps) => {
  const [period, setPeriod] = useState<PeriodCode | "">("");
  const { offers, isLoading, error } = useOffers(token, period || undefined, onUnauthorized);
  const { applications, error: applicationError, apply } = useApplications(
    token,
    onUnauthorized,
    user.kind === "STUDENT",
  );
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [message, setMessage] = useState("");

  const renderContent = () => {
    if (error) return <ErrorState message={error} />;
    if (isLoading) return <LoadingState />;
    if (offers.length === 0) return <EmptyState message="Aucune offre à afficher." />;
    return (
      <>
        <p className="result-count">
          {offers.length} offre{offers.length > 1 ? "s" : ""}
        </p>
        <OfferTable
          offers={offers}
          applications={applications}
          onApply={user.kind === "STUDENT" ? setSelectedOffer : undefined}
        />
        {selectedOffer && (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (await apply(selectedOffer.id, message)) {
                setSelectedOffer(null);
                setMessage("");
              }
            }}
          >
            <h2>Candidater à « {selectedOffer.title} »</h2>
            <label htmlFor="application-message">Message facultatif</label>
            <textarea
              id="application-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            {applicationError && <p role="alert">{applicationError}</p>}
            <button type="submit">Envoyer la candidature</button>
            <button type="button" onClick={() => setSelectedOffer(null)}>
              Annuler
            </button>
          </form>
        )}
      </>
    );
  };

  return (
    <section>
      <h1>Offres de stage</h1>
      <p>{DESCRIPTIONS[user.kind]}</p>
      <label className="filter-field" htmlFor="period-filter">
        Filtrer par période
        <select
          id="period-filter"
          value={period}
          onChange={(event) => setPeriod(event.target.value as PeriodCode | "")}
        >
          {PERIOD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {renderContent()}
    </section>
  );
};

export default OffersPage;
