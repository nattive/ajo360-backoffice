# Frontend Admin Dashboard API Integration Prompt

## Overview
You are tasked with creating a comprehensive admin savings dashboard page  frontend that integrates with the  API. The page should have tabs, each tabs with the savings type. This document provides complete API specifications, authentication requirements, and implementation guidelines for all savings type.

 
## Savings Management Endpoints

### GET /admin/business-locks
Retrieve business lock savings with filtering and pagination.

**Query Parameters:**
```typescript
interface SavingsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive' | 'completed' | 'cancelled';
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'balance' | 'maturityDate';
  sortOrder?: 'ASC' | 'DESC';
}
```

**Response Structure:**
```typescript
interface BusinessLocksResponse {
  data: AdminBusinessLockDto[];
  meta: PaginationMeta;
  summary: {
    totalBalance: number;
    totalSavings: number;
    activeSavings: number;
    inactiveSavings: number;
    averageBalance: number;
  };
}

interface AdminBusinessLockDto {
  id: string;
  lockDuration: number;
  maturityDate: string;
  interestRate: number;
  penaltyRate: number;
  autoRenewal: boolean;
  earlyWithdrawalAllowed: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  saving: {
    id: string;
    balance: number;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}
```

### GET /admin/business-targets
Retrieve business target savings.

**Response Structure:**
```typescript
interface BusinessTargetsResponse {
  data: AdminBusinessTargetDto[];
  meta: PaginationMeta;
  summary: SavingsSummary;
}

interface AdminBusinessTargetDto {
  id: string;
  targetAmount: number;
  targetDate: string;
  currentAmount: number;
  interestRate: number;
  user: UserBasicInfo;
  saving: SavingBasicInfo;
}
```

### GET /admin/group-savings
Retrieve group savings with member details.

**Response Structure:**
```typescript
interface GroupSavingsResponse {
  data: AdminGroupSavingDto[];
  meta: PaginationMeta;
  summary: SavingsSummary;
}

interface AdminGroupSavingDto {
  id: string;
  groupName: string;
  contributionAmount: number;
  minMembers: number;
  maxMembers: number;
  startDate: string;
  endDate: string;
  payoutFrequency: string;
  isActive: boolean;
  user: UserBasicInfo;
  saving: SavingBasicInfo;
}
```

### GET /admin/locked-savings
Retrieve locked savings with lock details.

**Response Structure:**
```typescript
interface LockedSavingsResponse {
  data: AdminLockedSavingDto[];
  meta: PaginationMeta;
  summary: SavingsSummary;
}

interface AdminLockedSavingDto {
  id: string;
  lockDuration: number;
  maturityDate: string;
  interestRate: number;
  user: UserBasicInfo;
  saving: SavingBasicInfo;
}
```

### GET /admin/target-savings
Retrieve target savings (non-business).

**Response Structure:**
```typescript
interface TargetSavingsResponse {
  data: AdminTargetSavingDto[];
  meta: PaginationMeta;
  summary: SavingsSummary;
}

interface AdminTargetSavingDto {
  id: string;
  targetAmount: number;
  targetDate: string;
  currentAmount: number;
  user: UserBasicInfo;
  saving: SavingBasicInfo;
}
```

## Frontend Implementation Guidelines

### 1. State Management
Implement a robust state management solution (Redux, Zustand, or Context API) to handle:
- Authentication state
- Dashboard data
- User management state
- Transaction data
- Savings data
- Loading states
- Error handling

### 2. API Service Layer
Create a centralized API service with:
- Axios or Fetch wrapper
- Request/response interceptors
- Error handling
- Token management
- Retry logic

**Example API Service:**
```typescript
class AdminApiService {
  private baseURL = 'http://localhost:3000';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }

  async getDashboard(): Promise<DashboardResponse> {
    const response = await fetch(`${this.baseURL}/admin/dashboard`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getUsers(params: UserQueryParams): Promise<UsersResponse> {
    const queryString = new URLSearchParams(params as any).toString();
    const response = await fetch(`${this.baseURL}/admin/users?${queryString}`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  // Add other methods...
}
```

### 3. Component Structure
Organize components into logical modules:

```
src/
├── components/
│   ├── common/
│   │   ├── DataTable/
│   │   ├── Pagination/
│   │   ├── SearchFilter/
│   │   └── StatusBadge/
│   ├── dashboard/
│   │   ├── DashboardCards/
│   │   ├── ChartComponents/
│   │   └── MetricsDisplay/
│   ├── users/
│   │   ├── UsersList/
│   │   ├── UserDetail/
│   │   ├── UserForm/
│   │   └── UserActions/
│   ├── transactions/
│   │   ├── TransactionsList/
│   │   ├── TransactionDetail/
│   │   └── TransactionFilters/
│   ├── savings/
│   │   ├── SavingsList/
│   │   ├── SavingsDetail/
│   │   └── SavingsFilters/
│   └── wallets/
│       ├── WalletsList/
│       └── WalletDetail/
├── pages/
│   ├── Dashboard/
│   ├── Users/
│   ├── Transactions/
│   ├── Savings/
│   └── Wallets/
├── services/
│   ├── api.service.ts
│   ├── auth.service.ts
│   └── storage.service.ts
├── store/
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   ├── transactions/
│   └── savings/
└── types/
    ├── api.types.ts
    ├── user.types.ts
    ├── transaction.types.ts
    └── savings.types.ts
```

### 4. Key Features to Implement

#### Dashboard
- Real-time metrics cards
- Interactive charts (users growth, transaction volume, savings trends)
- Quick action buttons
- Recent activities feed

#### User Management
- Searchable and filterable user table
- User detail modal/page
- Bulk actions (export, status updates)
- User verification management
- Wallet retrigger functionality

#### Transaction Management
- Advanced filtering (date range, amount range, status, type)
- Transaction detail view
- Export functionality
- Real-time status updates

#### Savings Management
- Tabbed interface for different savings types
- Detailed savings information
- Member management for group savings
- Maturity tracking for locked savings

#### Wallet Management
- Balance monitoring
- Account status management
- Transaction history per wallet

### 5. UI/UX Considerations

#### Design System
- Use a consistent design system (Material-UI, Ant Design, or custom)
- Implement responsive design
- Dark/light theme support
- Accessibility compliance

#### Data Visualization
- Charts for dashboard metrics (Chart.js, Recharts, or D3)
- Progress bars for savings targets
- Status indicators and badges
- Interactive tables with sorting and filtering

#### Performance
- Implement virtual scrolling for large datasets
- Lazy loading for images and components
- Debounced search inputs
- Optimistic updates for better UX

### 6. Error Handling

```typescript
interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Global error handler
const handleApiError = (error: ApiError) => {
  switch (error.statusCode) {
    case 401:
      // Redirect to login
      break;
    case 403:
      // Show access denied message
      break;
    case 500:
      // Show server error message
      break;
    default:
      // Show generic error message
  }
};
```

### 7. Security Considerations
- Implement proper token storage (httpOnly cookies or secure localStorage)
- Add CSRF protection
- Validate all user inputs
- Implement role-based access control
- Add audit logging for admin actions

### 8. Testing Strategy
- Unit tests for components and services
- Integration tests for API calls
- E2E tests for critical user flows
- Mock API responses for development

### 9. Deployment
- Environment-specific configurations
- Build optimization
- CDN integration for assets
- Progressive Web App (PWA) features

## Sample Implementation Snippets

### Dashboard Component
```typescript
import React, { useEffect, useState } from 'react';
import { AdminApiService } from '../services/api.service';
import { DashboardResponse } from '../types/api.types';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const apiService = new AdminApiService();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardData = await apiService.getDashboard();
        setData(dashboardData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error loading dashboard</div>;

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <MetricCard 
          title="Total Users" 
          value={data.users.total} 
          growth={data.users.growthRate}
        />
        <MetricCard 
          title="Total Transactions" 
          value={data.transactions.total} 
          amount={data.transactions.totalAmount}
        />
        <MetricCard 
          title="Total Savings" 
          value={data.savings.totalSavings} 
          amount={data.savings.totalSavingsAmount}
        />
        <MetricCard 
          title="Total Wallets" 
          value={data.wallets.totalWallets} 
          amount={data.wallets.totalBalance}
        />
      </div>
      
      <div className="charts-section">
        <UserGrowthChart data={data.users} />
        <TransactionVolumeChart data={data.transactions} />
        <SavingsDistributionChart data={data.savings} />
      </div>
    </div>
  );
};
```

### Users List Component
```typescript
import React, { useState, useEffect } from 'react';
import { AdminApiService } from '../services/api.service';
import { UsersResponse, UserQueryParams } from '../types/api.types';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UserQueryParams>({
    page: 1,
    limit: 10
  });
  
  const apiService = new AdminApiService();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await apiService.getUsers(filters);
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<UserQueryParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="users-list">
      <UserFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
      
      <DataTable 
        data={users?.data || []} 
        loading={loading}
        columns={[
          { key: 'firstName', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'phoneNumber', label: 'Phone' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Created' },
          { key: 'actions', label: 'Actions' }
        ]}
      />
      
      <Pagination 
        current={users?.meta.page || 1}
        total={users?.meta.totalPages || 1}
        onChange={handlePageChange}
      />
    </div>
  );
};
```

This comprehensive prompt provides everything needed to build a full-featured admin dashboard that integrates with all the implemented API endpoints. The frontend developer can use this as a complete specification to build a robust, scalable admin interface.