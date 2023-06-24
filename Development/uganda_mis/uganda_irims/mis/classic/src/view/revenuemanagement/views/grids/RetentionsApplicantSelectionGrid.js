/**
 * Created by Softclans
 * Kip on 9/26/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.RetentionsApplicantSelectionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicantSelectionCmnGrid',
    controller: 'revenuemanagementvctr',
    xtype: 'retentionsapplicantselectiongrid',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
    },
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
    tbar:[
        {
            xtype: 'tbspacer',
            width: 20
        }
    ],plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.fireEvent('retentionsapplicantselectiongrid', this);
        }
    },'->',{
        text:'Add the selected Applicants',
        name:'addselected_applicants',
        iconCls:'fa fa-search',
        ui:'soft-green'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'identification_no',
        text: 'Identification No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'contact_person',
        text: 'Contact Person',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'app_physical_address',
        text: 'Physical Address',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_postal_address',
        text: 'Postal Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tin_no',
        text: 'TIN',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'app_telephone',
        text: 'Telephone',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_email',
        text: 'Email',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1
    }],
   
    storeConfig:{
        config: {
            pageSize: 200, 
            remoteFilter: true,
            totalProperty:'totals',
            proxy: {
                url:'revenuemanagement/getRetentionAplicantsDetails'
            }
        },
        isLoad: true
    },
  
});
