import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, Series, ArgumentAxis, ValueAxis, CommonSeriesSettings, Legend, Tooltip, Label } from "devextreme-react/chart";
import {
  Landmark,
  Wallet,
  FileText,
  ArrowLeftRight,
  CreditCard,
  PieChart,
  BarChart2,
  Clock,
  Bell,
  Settings,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const DashboardPage = () => {
  // Sample data for charts
  const financialData = [
    { period: "Jan", income: 120000, expenses: 85000 },
    { period: "Feb", income: 150000, expenses: 90000 },
    { period: "Mar", income: 180000, expenses: 95000 },
    { period: "Apr", income: 160000, expenses: 100000 },
    { period: "May", income: 200000, expenses: 110000 },
  ];

  const accountDistribution = [
    { account: "Cash", value: 450000 },
    { account: "Bank", value: 1200000 },
    { account: "Receivables", value: 350000 },
    { account: "Payables", value: 280000 },
  ];

  const quickActions = [
    { key: "account", label: "New Account", icon: <Landmark className="h-5 w-5" /> },
    { key: "firm", label: "Add Firm", icon: <Users className="h-5 w-5" /> },
    { key: "payment", label: "Record Payment", icon: <CreditCard className="h-5 w-5" /> },
    { key: "journal", label: "Journal Entry", icon: <BookOpen className="h-5 w-5" /> },
    { key: "contra", label: "Contra Entry", icon: <ArrowLeftRight className="h-5 w-5" /> },
    { key: "expense", label: "Add Expense", icon: <ArrowDownRight className="h-5 w-5" /> },
  ];

  const recentTransactions = [
    { id: 1, date: "2025-05-07", description: "Office rent payment", amount: 75000, type: "expense" },
    { id: 2, date: "2025-05-06", description: "Client invoice payment", amount: 125000, type: "income" },
    { id: 3, date: "2025-05-05", description: "Supplier payment", amount: 45000, type: "expense" },
    { id: 4, date: "2025-05-04", description: "Consulting fee received", amount: 80000, type: "income" },
  ];

  return (
    <div className="p-2 md:p-8 space-y-8 bg-[#f4f6f8] min-h-screen">

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#f0f9ff] shadow-sm border-l-3 border-blue-400">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Balance</p>
                <p className="text-2xl font-semibold mt-1 text-gray-800">₹1,850,000</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 ml-1">12.5%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#f0fdf4] shadow-sm border-l-3 border-green-400">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Income (MTD)</p>
                <p className="text-2xl font-semibold mt-1 text-gray-800">₹320,000</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500 ml-1">8.2%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#fff1f2] shadow-sm border-l-3 border-red-400">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Expenses (MTD)</p>
                <p className="text-2xl font-semibold mt-1 text-gray-800">₹195,000</p>
              </div>
              <div className="p-2 rounded-lg bg-red-100">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              <span className="text-red-500 ml-1">3.7%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#fffbeb] shadow-sm border-l-3 border-amber-400">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Receivables</p>
                <p className="text-2xl font-semibold mt-1 text-gray-800">₹125,000</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-100">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              <span className="text-red-500 ml-1">5.1%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {quickActions.map(({ key, label, icon }) => (
            <Card key={key} className="bg-white shadow-sm border-l-3 border-purple-400 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <div className="p-3 rounded-full bg-purple-100 mb-2 text-purple-600">
                  {icon}
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Financial Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart dataSource={financialData} className="h-80">
              <CommonSeriesSettings argumentField="period" />
              <Series valueField="income" name="Income" type="line" color="#4CAF50" />
              <Series valueField="expenses" name="Expenses" type="line" color="#F44336" />
              <ArgumentAxis />
              <ValueAxis />
              <Legend verticalAlignment="bottom" horizontalAlignment="center" />
              <Tooltip enabled={true} />
            </Chart>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-100">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-800">Account Distribution</CardTitle>
    </CardHeader>
    <CardContent>
      <Chart 
        dataSource={accountDistribution} 
        className="h-80"
        palette="Soft Pastel"
      >
        <Series
          argumentField="account"
          valueField="value"
          type="bar"
          name="Amount"
        >
          <Label visible={true} format="currency" />
        </Series>
        <ArgumentAxis />
        <ValueAxis />
        <Legend 
          verticalAlignment="bottom" 
          horizontalAlignment="center" 
        />
        <Tooltip 
          enabled={true} 
          format="currency"
        />
      </Chart>
    </CardContent>
  </Card>
      </div>

      {/* Recent Transactions and Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border-l-3 border-indigo-400">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <p className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-white shadow-sm border-l-3 border-teal-400">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Total Assets</p>
                  <p className="text-sm font-medium text-gray-800">₹2,100,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Total Liabilities</p>
                  <p className="text-sm font-medium text-gray-800">₹450,000</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Net Worth</p>
                  <p className="text-sm font-medium text-gray-800">₹1,650,000</p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600">Current Ratio</p>
                    <p className="text-sm font-medium text-green-600">2.8:1</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-600">Debt-to-Equity</p>
                    <p className="text-sm font-medium text-amber-600">0.27:1</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;