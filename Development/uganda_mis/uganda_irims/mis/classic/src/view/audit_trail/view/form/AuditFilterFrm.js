Ext.define('Admin.view.audit_trail.views.forms.AuditFilterFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'auditfilterFrm',
    controller: 'audit_trialViewCtr',
    autoScroll: true,
    layout: 'hbox',
    widht: '100%',
   // bodyPadding: 8,
    defaults: {
        labelAlign: 'left',
        allowBlank: true
    },
    
    items: [{
        xtype: 'hiddenfield',
        name: 'def_id'
    },{
        xtype: 'combo',
        fieldLabel: 'Search Field',
        margin: '0 0 0 20',
        name: 'search_column',
        queryMode: 'local',
        store: [],
        listeners: {
            change: function(combo,newValue,oldValue,eopts) {
                var form=combo.up('form'),
                    field = form.down('textfield[name=search_value]');
                if(newValue){
                    console.log(newValue);
                    field.allowBlank = false;
                }else{
                    field.allowBlank = true;
                    console.log('two');

                }


            },
           
        }
    },{
        xtype: 'textfield',
        margin: '0 20 0 0',
        name: 'search_value'
    },{
        xtype: 'datefield',
        margin: '0 20 20 0',
        fieldLabel: 'Action Date From',
        format: 'Y-m-d',
        allowBlank: true,
        name: 'date_from'
    },{
        xtype: 'datefield',
        margin: '0 20 20 0',
        fieldLabel: 'Action Date To',
        allowBlank: true,
        format: 'Y-m-d',
        name: 'date_to'
    },{
        xtype: 'button',
        text: 'Search',
        iconCls: 'x-fa fa-search',
        margin: '0 20 20 0',
        formBind: true,
        ui: 'soft-purple',
        handler: 'searchAudit'
    }]
});



