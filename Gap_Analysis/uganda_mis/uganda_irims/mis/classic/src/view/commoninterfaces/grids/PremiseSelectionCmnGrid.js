/**
 * Created by Softclans on 3/8/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.PremiseSelectionCmnGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'premiseselectioncmngrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Premise Name',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'applicant_name',
                text: 'Applicant Name',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'premise_reg_no',
                text: 'Registration No',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'permit_no',
                text: 'Permit No',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'physical_address',
                text: 'Physical Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'postal_address',
                text: 'Postal Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'region_name',
                text: 'Region',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'district_name',
                text: 'District',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
