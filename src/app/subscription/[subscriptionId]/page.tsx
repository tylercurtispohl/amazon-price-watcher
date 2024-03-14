import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../../../amplifyconfiguration.json";
import {
  getProductSubscription,
  notificationsByProductSubscriptionIdAndTimestamp,
} from "@/graphql/queries";
import { NotificationsTable } from "@/app/components/notifications/notificationsTable";
import { SubscriptionButtons } from "@/app/components/subscriptions/subscriptionButtons";

Amplify.configure(config);

const client = generateClient();

export default async function Page({
  params,
}: {
  params: { subscriptionId: string };
}) {
  const { subscriptionId } = params;

  const getSubscriptionsResult = await client.graphql({
    query: getProductSubscription,
    variables: {
      id: subscriptionId,
    },
  });

  const subscription = getSubscriptionsResult.data.getProductSubscription;

  const getNotificationsResult = await client.graphql({
    query: notificationsByProductSubscriptionIdAndTimestamp,
    variables: { productSubscriptionId: subscriptionId },
  });

  return (
    <>
      {subscription ? (
        <>
          <div className="mb-6 flex flex-col gap-6">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl tracking-wide font-semibold">
                Subscription for {subscription.product.name}
              </h1>
              <SubscriptionButtons
                productId={subscription.productId}
                subscriptionId={subscription.id}
                status={subscription.status}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="font-medium tracking-wide">Email</h2>
                <p>{subscription.email}</p>
              </div>
              <div>
                <h2 className="font-medium tracking-wide">Status</h2>
                <p>{subscription.status}</p>
              </div>
            </div>
          </div>
          <h2 className="font-medium tracking-wide mb-2">Notifications</h2>
          <NotificationsTable
            notificationsByProductSubscriptionIdAndTimestampQueryresult={
              getNotificationsResult.data
            }
          />
        </>
      ) : (
        <>
          <p>Subscription not found</p>
        </>
      )}
    </>
  );
}
