/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialSponsorFrm', {
    extend: 'Admin.view.clinicaltrial.views.forms.ClinicalTrialAbstractFrm',
    xtype: 'clinicaltrialsponsorfrm',
    listeners: {
        afterrender: function () {
            var form = this,
                search_btn=form.down('button[action=search_btn]'),
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                search_btn.setDisabled(true);
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
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
                value: 'sponsor'
            }
        );
    }
});