/**
 * Created by Kip on 4/25/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PremiseSuperintendentFrm', {
    extend: 'Admin.view.premiseregistration.views.forms.PremisePersonnelAbstractFrm',
    xtype: 'premisesuperintendentfrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                //form.down('button[action=link_personnel]').setDisabled(true);
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setDisabled(true);
                });
            }
        }
    },
    initComponent: function () {
        this.callParent();
        this.add(
            {
                xtype: 'hiddenfield',
                name: 'personnel_type',
                value: 'superintendent'
            },
            {
                xtype: 'hiddenfield',
                name: 'premise_id'
            },{
                xtype: 'hiddenfield',
                name: 'id'
            },{
                xtype: 'hiddenfield',
                name: 'manufacturing_site_id'
            },
            {
                xtype: 'combo',
                fieldLabel: 'Position',
                name: 'position_id',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                forceSelection: true,
                store: 'personnelpositionsstr'
            },
            {
                xtype: 'textfield',
                name: 'registration_no',
                fieldLabel: 'Registration No'
            },{
                xtype: 'textfield',
                name: 'study_field',   fieldLabel: 'Field of Study',
            },
            
            {
                xtype: 'combo',
                name: 'qualification_id',
                fieldLabel: 'Qualification',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                store: 'personnelqualificationsstr',
                listeners:{
                    afterrender: function(){
                        var store=this.getStore();
                        store.removeAll();
                        store.load();
                    }
                }
            }
        );
    },
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            name: 'save_btn',
            //table_name: 'tra_personnel_information',
            storeID: 'premisepersonneldetailsstr',
            action_url: 'premiseregistration/savePremisePersonnelLinkageDetails',
            handler: 'savePremisePersonnelLinkageDetails'
        }
    ]
});