# Archive System Documentation

This document provides an overview of the archive system implemented in the GSU Inventory Management System.

## Overview

The archive system preserves deleted records from your database by moving them to dedicated archive tables instead of permanently removing them. This ensures that data is not lost when records are deleted, and it maintains a history of all records that were part of your system.

## Key Features

- Records are archived before deletion
- Original IDs are preserved for reference
- Deletion metadata is stored (who deleted it, when, and why)
- Archived records can be viewed in the admin interface
- Primary keys in main tables are unaffected

## Database Structure

### Archive Tables

1. **students_archive**: Stores deleted student records
2. **employees_archive**: Stores deleted employee records

Both tables include the following fields:
- `id` - Primary key of the archive table
- `original_id` - ID from the original table (for reference)
- All original fields from the source table
- `deleted_at` - When the record was deleted
- `delete_reason` - Why the record was deleted
- `deleted_by` - Who deleted the record

## Components

### Backend Components

1. **Archive Service** (`ArchiveService.php`)
   - Handles archiving logic
   - Provides methods to archive records
   - Retrieves archived records

2. **Archive Controller** (`ArchiveController.php`)
   - Endpoints for retrieving archive data
   - Endpoints for deleting and archiving in one step

3. **Record Controller** (`RecordController.php`)
   - Integrates archiving into record deletion process

### Frontend Components

1. **Archive Viewer** (`ArchiveViewer.jsx`)
   - Displays archived records in a table
   - Allows filtering by type (students or employees)

2. **Archive Modal** (`ArchiveModal.jsx`)
   - UI for archiving records with reason collection

3. **Delete with Archive Modal** (`DeleteWithArchiveModal.jsx`)
   - UI for deleting records with archive reason collection

## API Endpoints

### Archive Endpoints

- `GET /api/archive/students` - Get all archived students
- `GET /api/archive/employees` - Get all archived employees
- `DELETE /api/archive/students/{id}` - Archive and delete a student
- `DELETE /api/archive/employees/{id}` - Archive and delete an employee

### Record Management with Archive

- `DELETE /api/records/students/{id}` - Delete student with archiving
- `DELETE /api/records/employees/{id}` - Delete employee with archiving

## How to Use

### Viewing Archives

1. Navigate to the Admin Dashboard
2. Click on "Archives" in the dashboard menu
3. Use the tabs to switch between Students and Employees archives

### Deleting Records with Archiving

When deleting a student or employee:
1. Click the Delete button for the record
2. Enter a reason for deletion in the modal
3. Confirm deletion
4. The record will be archived and then removed from the active table

## Best Practices

1. Always provide a meaningful reason when deleting records
2. Regularly review archived records for data management purposes
3. Consider archiving as a soft delete - you can restore important records if needed

## Technical Implementation

The archiving process is wrapped in database transactions to ensure data consistency. If archiving fails, the deletion is aborted to prevent data loss.

```php
DB::beginTransaction();
try {
    // Archive the record
    // Delete the record
    DB::commit();
} catch (\Exception $e) {
    DB::rollBack();
    // Handle error
}
```
