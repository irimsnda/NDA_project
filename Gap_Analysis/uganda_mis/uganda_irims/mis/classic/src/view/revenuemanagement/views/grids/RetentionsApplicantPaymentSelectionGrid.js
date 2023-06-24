Ext.define('Admin.view.revenuemanagement.views.grids.RetentionsApplicantPaymentSelectionGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicantSelectionCmnGrid',
    controller: 'revenuemanagementvctr',
    xtype: 'retentionsapplicantpaymentselectiongrid',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.fireEvent('retentionsapplicantpaymentselectiongrid', this);
        }
    },'->',{
        text:'Add the selected Applicants',
        name:'addselected_applicants',
        iconCls:'fa fa-search',
        ui:'soft-green'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
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