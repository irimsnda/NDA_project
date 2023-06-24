/**
 * Created by softclans.  appinvoicepaymentspanel pharmaceuticalgmpctn
 */
Ext.define('Admin.view.commoninterfaces.MultiTransitionAppOtherDetails', {
    extend: 'Ext.tab.Panel',
    xtype: 'multitransitionappotherdetails',
    itemId: 'multitransitionappotherdetails',
    //height: Ext.Element.getViewportHeight() - 118,
    controller:'commoninterfacesVctr',
    layout: 'border',
    tbar:[
        {
            xtype: 'exportbtn'
        },{
			xtype:'hiddenfield',
			name:'application_code'
			
		},{
			xtype:'hiddenfield',
			name:'application_id'
			
		},{
			xtype:'hiddenfield',
			name:'reference_no'
			
		},{
			xtype:'hiddenfield',
			name:'active_application_code'
		}
    ],
    layout: 'fit',
    items:[{
        xtype: 'multitransitionsgrid',
        title: 'Application Transitions Details'
    },{
        xtype: '',
        title: 'Application Invoice Details',
            xtype: 'paymentinvoicingcostdetailsgrid', 
            features:[{
                ftype:'searching'
            }]
    },{
        xtype: 'prevapppaymentsreceiptsgrid',
        title: 'Application Payments Details'
        
    }]

});