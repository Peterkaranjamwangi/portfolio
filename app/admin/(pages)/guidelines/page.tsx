"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const WebsiteCostGuide = () => {
  const [editMode, setEditMode] = useState(false);
  const [costFactors, setCostFactors] = useState([
    {
      name: "Domain",
      cost: "Ksh 950 - Ksh 10,000 per year",
      description: "Your online identity (.com, .org, .co.ke, etc.)",
    },
    {
      name: "Shared Hosting",
      cost: "Ksh 2,100 - Ksh 14,100 per year",
      description: "Suitable for small to medium websites",
    },
    {
      name: "Dedicated Hosting",
      cost: "Ksh 5,100 - Ksh 25,100 per year",
      description: "For high-traffic or resource-intensive websites",
    },
    {
      name: "Content Writing",
      cost: "Ksh 200 - Ksh 500 per 100 words",
      description: "Professional SEO-optimized content",
    },
  ]);

  const [websiteTypes, setWebsiteTypes] = useState([
    {
      type: "Landing Page",
      features: "1-3 responsive pages, contact form, basic SEO",
      cost: "Ksh 10,000 - Ksh 20,000",
      suitableFor:
        "Small businesses, event promotions, single product showcase",
    },
    {
      type: "Small Business",
      features:
        "Several pages, social media integration, Google My Business, Analytics",
      cost: "Ksh 20,000 - Ksh 30,000",
      suitableFor: "Local businesses, professional services, startups",
    },
    {
      type: "Ecommerce",
      features:
        "Product catalog, shopping cart, payment integration, order management",
      cost: "Ksh 35,000 - Ksh 70,000",
      suitableFor: "Online stores, digital product sellers",
    },
    {
      type: "Corporate",
      features:
        "Advanced functionality, unlimited pages, custom design, CRM integration",
      cost: "Ksh 45,000 - Ksh 90,000",
      suitableFor: "Large businesses, organizations, enterprises",
    },
  ]);

  const [maintenancePlans, setMaintenancePlans] = useState([
    {
      name: "Basic",
      features: "Monthly backups, security updates, minor content changes",
      cost: "Ksh 2,000 - Ksh 5,000 per month",
    },
    {
      name: "Standard",
      features: "Weekly backups, security updates, content changes, basic SEO",
      cost: "Ksh 5,000 - Ksh 10,000 per month",
    },
    {
      name: "Premium",
      features:
        "Daily backups, priority support, unlimited changes, advanced SEO, performance optimization",
      cost: "Ksh 10,000 - Ksh 20,000 per month",
    },
  ]);

  const [additionalFeatures, setAdditionalFeatures] = useState([
    { feature: "SSL Certificate", cost: "Ksh 2,000 - Ksh 5,000 per year" },
    { feature: "Custom Email Setup", cost: "Ksh 1,000 - Ksh 3,000 one-time" },
    { feature: "Website Redesign", cost: "Ksh 15,000 - Ksh 50,000" },
    { feature: "E-commerce Integration", cost: "Ksh 20,000 - Ksh 40,000" },
    { feature: "Multilingual Support", cost: "Ksh 10,000 - Ksh 30,000" },
  ]);

  const handleEdit = (setter) => (index, field, value) => {
    setter((prev) => {
      const newArray = [...prev];
      newArray[index][field] = value;
      return newArray;
    });
  };

  const handleAdd = (setter, defaultItem) => () => {
    setter((prev) => [...prev, defaultItem]);
  };

  const handleRemove = (setter) => (index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        Website Cost Guide for Kenya
      </h1>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-blue-700">
            This comprehensive guide helps in negotiating with potential clients
            and setting fair prices. Toggle edit mode to update information as
            market rates change.
          </p>
        </CardContent>
      </Card>

      <div className="mb-4">
        <Button
          onClick={() => setEditMode(!editMode)}
          variant={editMode ? "destructive" : "default"}
        >
          {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="cost-factors">
          <AccordionTrigger>Website Cost Factors</AccordionTrigger>
          <AccordionContent>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              {...fadeInUp}
            >
              {costFactors.map((factor, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>
                      {editMode ? (
                        <Input
                          value={factor.name}
                          onChange={(e) =>
                            handleEdit(setCostFactors)(
                              index,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        factor.name
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editMode ? (
                      <>
                        <Input
                          className="mb-2"
                          value={factor.cost}
                          onChange={(e) =>
                            handleEdit(setCostFactors)(
                              index,
                              "cost",
                              e.target.value
                            )
                          }
                        />
                        <Textarea
                          value={factor.description}
                          onChange={(e) =>
                            handleEdit(setCostFactors)(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </>
                    ) : (
                      <>
                        <p className="font-semibold text-green-600">
                          {factor.cost}
                        </p>
                        <p className="text-sm text-gray-600">
                          {factor.description}
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="website-types">
          <AccordionTrigger>Website Types and Costs</AccordionTrigger>
          <AccordionContent>
            <motion.div {...fadeInUp}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Cost Range</TableHead>
                    <TableHead>Suitable For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websiteTypes.map((type, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editMode ? (
                          <Input
                            value={type.type}
                            onChange={(e) =>
                              handleEdit(setWebsiteTypes)(
                                index,
                                "type",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          type.type
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Textarea
                            value={type.features}
                            onChange={(e) =>
                              handleEdit(setWebsiteTypes)(
                                index,
                                "features",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          type.features
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input
                            value={type.cost}
                            onChange={(e) =>
                              handleEdit(setWebsiteTypes)(
                                index,
                                "cost",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="font-semibold text-green-600">
                            {type.cost}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input
                            value={type.suitableFor}
                            onChange={(e) =>
                              handleEdit(setWebsiteTypes)(
                                index,
                                "suitableFor",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          type.suitableFor
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="maintenance">
          <AccordionTrigger>Maintenance Plans</AccordionTrigger>
          <AccordionContent>
            <motion.div {...fadeInUp}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Cost</TableHead>
                    {editMode && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenancePlans.map((plan, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editMode ? (
                          <Input
                            value={plan.name}
                            onChange={(e) =>
                              handleEdit(setMaintenancePlans)(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          plan.name
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Textarea
                            value={plan.features}
                            onChange={(e) =>
                              handleEdit(setMaintenancePlans)(
                                index,
                                "features",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          plan.features
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input
                            value={plan.cost}
                            onChange={(e) =>
                              handleEdit(setMaintenancePlans)(
                                index,
                                "cost",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="font-semibold text-green-600">
                            {plan.cost}
                          </span>
                        )}
                      </TableCell>
                      {editMode && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemove(setMaintenancePlans)(index)
                            }
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {editMode && (
                <Button
                  className="mt-4"
                  onClick={handleAdd(setMaintenancePlans, {
                    name: "New Plan",
                    features: "",
                    cost: "",
                  })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Plan
                </Button>
              )}
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="additional-features">
          <AccordionTrigger>Additional Features</AccordionTrigger>
          <AccordionContent>
            <motion.div {...fadeInUp}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Cost</TableHead>
                    {editMode && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {additionalFeatures.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {editMode ? (
                          <Input
                            value={item.feature}
                            onChange={(e) =>
                              handleEdit(setAdditionalFeatures)(
                                index,
                                "feature",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          item.feature
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input
                            value={item.cost}
                            onChange={(e) =>
                              handleEdit(setAdditionalFeatures)(
                                index,
                                "cost",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <span className="font-semibold text-green-600">
                            {item.cost}
                          </span>
                        )}
                      </TableCell>
                      {editMode && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemove(setAdditionalFeatures)(index)
                            }
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {editMode && (
                <Button
                  className="mt-4"
                  onClick={handleAdd(setAdditionalFeatures, {
                    feature: "New Feature",
                    cost: "",
                  })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Feature
                </Button>
              )}
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mt-8 bg-yellow-50 border-yellow-500">
        <CardContent className="p-6">
          <p className="text-sm text-yellow-700">
            Note: These are general guidelines. Each project is unique and may
            require custom pricing based on specific client needs, project
            complexity, and current market rates. Always consider the value
            you&apos;re providing and your expertise when quoting prices.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WebsiteCostGuide;
